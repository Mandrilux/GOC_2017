<?php

namespace GOC\PlatformBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GOCPlatformBundle:Default:index.html.twig');
    }

    public function privateAction()
    {
      $url = "https://api.tfl.lu/v1/Occupancy/CarPark";

    $ch = curl_init($url);
    $options = array(
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_RETURNTRANSFER => true
    );
    curl_setopt_array( $ch, $options );
    $response = curl_exec($ch);
    curl_close($ch);

    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Headers: X-Requested-With");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Origin: [MYDOMAIN]");
    $parsed_json = json_decode($response);
    $name = $parsed_json->{'features'}->[0]->{'properties'}->{'name'};
    return $this->render('GOCPlatformBundle:Default:priv.html.twig', array('rep' => $parsed_json));
    }
}
