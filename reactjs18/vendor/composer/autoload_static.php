<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit185e82282c77b7db7d6421730a0ebfde
{
    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit185e82282c77b7db7d6421730a0ebfde::$classMap;

        }, null, ClassLoader::class);
    }
}