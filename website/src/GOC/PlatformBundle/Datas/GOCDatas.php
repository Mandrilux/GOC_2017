<?php

namespace GOC/PlatformBundle\Datas;

class OCDatas
{
	 public function isSpam($text)
	   {
		return strlen($text) < 50;
	   }
}	