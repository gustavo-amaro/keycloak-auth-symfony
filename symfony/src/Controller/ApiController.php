<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class ApiController extends AbstractController
{

    private $products = [];

    public function __construct()
    {
        $this->products = [
            [
                'description' => 'iPhone 11',
                'price' => 6999.99
            ],
            [
                'description' => 'Playstation 5',
                'price' => 4499.00
            ]
        ];
    }

    /**
     * @Route("/products", name="product_list", methods={"GET"})
     */
    public function listProducts()
    {
        return new Response(json_encode($this->products));
    }

    /**
     * @Route("/create-user", name="create_user", methods={"POST"})
     */
    public function createUser(Request $request)
    {
        $userUrl = "http://host.docker.internal:8080/auth/admin/realms/rockfeller/users";
        $client = HttpClient::create();

        $authorization = $request->headers->get('Authorization');

        $created = false;

        try {
            $response = $client->request('POST', $userUrl, [
                'body' => [
                    "attributes" => [],
                    "email" => "test97@gmail.com",
                    "emailVerified" => "",
                    "enabled" => true,
                    "firstName" => "Gustavo",
                    "lastName" => "Lms",
                    "username" => "integracaosite97"
                ],
                "headers" => [
                    "Authorization" => $authorization,
                    "Referer" => "http://localhost:8000",
                    "origin" => "http://localhost:8000",
                    "Content-Type" => "application/json;charset=UTF-8",
                    "Accept" => "application/json"
                ]
            ]);

            $response->getStatusCode();

            dd($response->toArray());

            if ($response->getStatusCode() === 201) {
                $created = true;
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }

        return new Response(json_encode(['message' => $created ? 'ok!' : 'Erro ao criar usuário!']));
    }
}
