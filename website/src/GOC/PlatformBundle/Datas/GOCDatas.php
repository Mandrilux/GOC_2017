<?php

namespace GOC\PlatformBundle\Datas;

class GOCDatas
{
	 public function isSpam($text)
	   {
		return strlen($text) < 50;
	   }
}