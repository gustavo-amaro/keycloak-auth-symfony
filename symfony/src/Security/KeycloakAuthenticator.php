<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\Cache\TagAwareCacheInterface;

class KeycloakAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ParameterBagInterface $parameterBag,
        private TagAwareCacheInterface $cacheApp,
        private UserRepository $userRepository
    ) {
    }

    /**
     * Called on every request to decide if this authenticator should be
     * used for the request. Returning `false` will cause this authenticator
     * to be skipped.
     */
    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization');
    }

    /**
     * @param Request $request
     *
     * @return Passport
     */
    public function authenticate(Request $request): Passport
    {
        global $jwtToken;
        // Get token from header
        $jwtToken = $request->headers->get('Authorization');

        if (false === str_starts_with($jwtToken, 'Bearer ')) {
            throw new AuthenticationException('Invalid token');
        }

        $jwtToken = trim(str_replace('Bearer ', '', $jwtToken));

        // Decode the token
        $parts = explode('.', $jwtToken);
        if (count($parts) !== 3) {
            throw new AuthenticationException('Invalid token');
        }

        $header = json_decode(base64_decode($parts[0]), true);

        $jwtPublicKey = $this->parameterBag->get('jwt_public_key');

        // Validate token
        try {
            $key = new Key($jwtPublicKey, $header['alg']);
            $decodedToken = JWT::decode($jwtToken, $key);
        } catch (Exception $e) {
            throw new AuthenticationException($e->getMessage());
        }

        return new SelfValidatingPassport(
            new UserBadge($decodedToken->sub, function (string $userId) {
                //$user = $this->userRepository->find($userId);
                global $jwtToken;
                $user = new User($userId);
                $user->setRoles(['ROLE_USER', 'ROLE_ADMIN']);

                $httpClient = HttpClient::create();

                try {
                    $response = $httpClient->request('GET', $this->parameterBag->get('keycloak_url') . "/auth/realms/{$this->parameterBag->get('keycloak_realm')}/protocol/openid-connect/userinfo", [
                        'headers' => [
                            "Authorization" => "Bearer {$jwtToken}",
                            "Referer" => "http://localhost:8000"
                        ]
                    ]);
                    $response->getStatusCode();
                    $responseArray = $response->toArray();
                } catch (\Exception $e) {
                    throw new AuthenticationException($e->getMessage());
                }

                $roles = [];

                foreach ($responseArray['roles'] as $role) {
                    $roles[] = 'ROLE_' . strtoupper($role);
                }

                $user->setRoles($roles);
                return $user;
            })
        );;
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @param string $firewallName
     *
     * @return Response|null
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // on success, let the request continue
        return null;
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     *
     * @return Response|null
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'error' => strtr($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }
}
