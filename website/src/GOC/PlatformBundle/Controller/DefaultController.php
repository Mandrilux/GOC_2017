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
        return $this->render('GOCPlatformBundle:Default:index.html.twig');
    }
}
