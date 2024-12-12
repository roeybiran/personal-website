<?php

function rb_get_versioned_href($name, $uri = null, $path = null)
{
  $path = sprintf('%s/%s', $path ?? get_stylesheet_directory(), $name);
  $ver = date('ymd-Gis', filemtime($path));
  $url = sprintf('%s/%s', $uri ?? get_stylesheet_directory_uri(), $name);
  return add_query_arg('ver', $ver, $url);
}

function rb_get_the_content($id)
{
  echo apply_filters('the_content', get_the_content($id));
}

function rb_parse_appcast($slug)
{
  $assets_path = sprintf("%s/%s", wp_upload_dir()["basedir"], $slug);
  $assets_uri = sprintf('%s/%s', wp_upload_dir()["baseurl"], $slug);
  $appcast_path = $assets_path . "/appcast.xml";
  $appcast_uri = $assets_uri . "/appcast.xml";
  $appcast_content = @file_get_contents($appcast_path);

  if (empty($appcast_content)) return null;

  $sys_reqs = "macOS only.";
  if ($appcast_content && preg_match('/<sparkle:minimumSystemVersion>([^<]+)<\/sparkle:minimumSystemVersion>/', $appcast_content, $matches)) {
    $sys_reqs = sprintf('Requires <strong>macOS %s</strong> or later.', $matches[1]);
  };

  $release_notes = null;
  if ($appcast_content && preg_match('/<sparkle:releaseNotesLink>([^<]+)<\/sparkle:releaseNotesLink>/', $appcast_content, $matches)) {
    $release_notes = $matches[1];
  }

  $dmg_path = null;
  $dmg_url = null;
  if ($appcast_content && preg_match('/<enclosure url="([^"]+)"/', $appcast_content, $matches)) {
    $dmg_path = $matches[1];
    $dmg_path = parse_url($dmg_path);
    $dmg_path = basename($dmg_path['path']);
    $dmg_path = urldecode($dmg_path);
    $dmg_url = $assets_uri . "/" . $dmg_path;
    $dmg_path = $assets_path . "/" . $dmg_path;
  }

  return [
    "sys_reqs" => $sys_reqs,
    "release_notes" => $release_notes,
    "dmg_path" => $dmg_path,
    "dmg_url" => $dmg_url,
    "appcast_uri" => $appcast_uri,
    "appcast_path" => $appcast_path
  ];
}

add_filter('wp_video_shortcode', function ($output, $atts, $video, $post_id, $library) {
  $updated_string = preg_replace('/<div style="width: [^"]+;"/', '<div', $output);
  return $updated_string;
}, 10, 5);


add_filter('the_content', function ($content) {
  return preg_replace('|<p>(<img[^<]*)|i', '<p class="paragraph-img-wrapper">${1}', $content);
});

add_theme_support('post-thumbnails');
