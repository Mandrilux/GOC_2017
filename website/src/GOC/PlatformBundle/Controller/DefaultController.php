<?php

namespace GOC\PlatformBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;


class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('GOCPlatformBundle:Default:index.html.twig');
    }

    public function apkAction()
    {
      $response = new BinaryFileResponse('AllPlace.apk');
      $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT,'AllPlace.apk');
      return $response;
        //return $this->render('GOCPlatformBundle:Default:apk.html.twig');
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
    header("Access-Control-Allow-Origin: *");
    $parsed_json = json_decode($response);
    $p1 = array("");
    $p2 = array("");
    $p3 = array("");
    $name = $parsed_json->{'features'}[0]->{'properties'}->{'name'};
    $place = $parsed_json->{'features'}[0]->{'properties'}->{'free'};
    $addr = $parsed_json->{'features'}[0]->{'properties'}->{'meta'}->{'address'}->{'street'};
    array_push($p1, $name, $place, $addr);
    $name = $parsed_json->{'features'}[1]->{'properties'}->{'name'};
    $place = $parsed_json->{'features'}[1]->{'properties'}->{'free'};
    $addr = $parsed_json->{'features'}[1]->{'properties'}->{'meta'}->{'address'}->{'street'};
    array_push($p2, $name, $place, $addr);
    $name = $parsed_json->{'features'}[2]->{'properties'}->{'name'};
    $place = $parsed_json->{'features'}[2]->{'properties'}->{'free'};
    $addr = $parsed_json->{'features'}[2]->{'properties'}->{'meta'}->{'address'}->{'street'};
    array_push($p3, $name, $place, $addr);
    return $this->render('GOCPlatformBundle:Default:priv.html.twig', array('rep' => $parsed_json, 'p1' => $p1, 'p2'=> $p2, 'p3'=> $p3));
    }
}
