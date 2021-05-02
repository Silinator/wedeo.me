<?php
function dbEsc($string) {
  return mysqli_real_escape_string( db::$link, $string );
}

function autolink( $str, $attributes=array() ) {
  $http_re = array('https' => ' https','http' => ' http');
  $str = str_replace(array_keys($http_re),array_values($http_re), $str);

  $attrs = '';
  foreach( $attributes as $attribute => $value ) {
    $attrs .= " {$attribute}=`{$value}`";
  }

  $str = ' ' . $str;
  $str = preg_replace(
    '`([^"=\'>])(((http|https|ftp)://|www.)[^\s<]+[^\s<\.)])`i',
    '$1<a href=\"$2\"'.$attrs.'>$2</a>',
    $str
  );

  $str = substr($str, 1);
  $str = preg_replace('`href=\"www`','href="http://www',$str);

  return $str;
}
?>
