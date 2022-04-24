<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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
}
