<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidType;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME)]
    private string $id;

    private $roles = ['ROLE_USER'];

    /**
     * @param string $id
     */
    public function __construct(string $id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @param string $id
     *
     * @return User
     */
    public function setId(string $id): User
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return array|string[]
     */
    public function getRoles(): array
    {
        return $this->roles;
    }


    public function setRoles($roles)
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return void
     */
    public function eraseCredentials()
    {
        return;
    }

    /**
     * @return string
     */
    public function getUserIdentifier(): string
    {
        return $this->getId();
    }

    public function getPassword()
    {
    }

    public function getSalt()
    {
    }

    public function getUsername()
    {
    }
}
