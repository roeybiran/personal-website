<?php

global $wp;

$req = strtolower($wp->request);
$req = $wp->request;

function match_route($route)
{
  $patterns = [
    'apps/([^/]+)/help',
    'apps/([^/]+)/privacy',
    'apps/([^/]+)/release-notes',
    'apps/([^/]+)/download',
    'apps/([^/]+)/buy',
    'apps/([^/]+)/appcast\.xml',
    'apps/([^/]+)/([^/]+\.html)',
    'apps/([^/]+)/([^/]+\.dmg)',
    'apps/([^/]+)/([^/]+\.delta)',
  ];

  foreach ($patterns as $pattern) {
    if (preg_match('#^' . $pattern . '$#', $route, $matches)) {
      return $matches;
    }
  }

  return false;
}

$title = get_the_title();
$description = get_bloginfo('description');
$og_image = get_field("og_image", "option");
$content;

ob_start();

if (is_front_page()) {
  get_template_part('template-parts/page', 'front');
} elseif (is_page('apps')) {
  get_template_part('template-parts/page', 'apps');
} elseif (is_page('projects')) {
  get_template_part('template-parts/page', 'projects');
} elseif (is_single() && has_category('apps')) {
  $repo = get_field('repo_url');
  if ($repo) {
    wp_redirect($repo);
    exit;
  } else {
    $id = get_the_ID();

    $title = get_the_title($id);
    $description = get_the_excerpt($id);
    $og_image = get_field("opengraph_image", $id);
    get_template_part('template-parts/page', 'app', ["id" => $id]);
  }
} else {
  try {
    $matches = match_route($req);
    if (!$matches) throw new Exception("", 404);

    $path = $matches[0];
    $slug = $matches[1];
    $post = get_page_by_path($slug, OBJECT, 'post');

    if (!$post) throw new Exception("", 404);

    $id = $post->ID;
    $appcast = rb_parse_appcast($slug);

    if (str_ends_with($path, "buy") && get_field('store_id', $id)) {
      wp_redirect("https://roeybiran.gumroad.com/l/" . get_field('store_id', $id));
      exit;
    }

    if (str_ends_with($path, "appcast.xml")) {
      http_response_code(200);
      header('Content-Type: application/xml');
      header('Content-Disposition: attachment; filename="appcast.xml"');
      readfile($appcast['appcast_path']);
      exit;
    }

    if (str_ends_with($path, 'download')) {
      $dmg_path = $appcast['dmg_path'];
      $filename = $post->post_title . ".dmg";
      http_response_code(200);
      header('Content-Type: application/octet-stream');
      header(sprintf('Content-Length: %s', filesize($dmg_path)));
      header(sprintf('Content-Disposition: attachment; filename="%s"', $filename));
      readfile($dmg_path);
      exit;
    }

    // https://roeybiran.local/apps/finbar/Finbar%201.13.6.dmg
    if (str_ends_with($path, ".dmg") || str_ends_with($path, ".delta")) {
      http_response_code(200);
      $filename = urldecode($matches[2]);
      $file = sprintf("%s/%s/%s", wp_upload_dir()["basedir"], $slug, $filename);
      header('Content-Type: application/octet-stream');
      header(sprintf('Content-Length: %s', filesize($file)));
      header(sprintf('Content-Disposition: attachment; filename="%s"', $filename));
      readfile($file);
      exit;
    }

    if (str_ends_with($path, ".html")) {
      http_response_code(200);
      $filename = urldecode($matches[2]);
      $file = sprintf("%s/%s/%s", wp_upload_dir()["basedir"], $slug, $filename);
      readfile($file);
      exit;
    }

    get_template_part('template-parts/nav', 'app', ["id" => $id]);

    $description = get_the_excerpt($id);
    $og_image = get_field("og_image", $id);

    if (str_ends_with($path, "release-notes")) {
      $title = sprintf("%s: %s", get_the_title($id), "Release Notes");
      printf('<h1 class="sr-only">%s: Release Notes</h1>', $post->post_title);
      echo '<div class="page-content prose layout">';
      echo get_field("release_notes", $id);
      echo '</div>';
    } else if (str_ends_with($path, "help") && get_field('help', $id)) {
      $title = sprintf("%s: %s", get_the_title($id), "Help");
      echo '<div class="page-content prose layout">';
      get_template_part('template-parts/page', 'help', ["id" => $id]);
      echo '</div>';
    } else if (str_ends_with($path, "privacy") && get_field('privacy', $id)) {
      $title = sprintf("%s: %s", get_the_title($id), "Privacy");
      printf('<h1 class="sr-only">%s: Privacy</h1>', $post->post_title);
      echo '<div class="page-content prose layout">';
      echo get_field("privacy", $id);
      echo '</div>';
    } else {
      throw new Exception("", 404);
    }

    http_response_code(200);
  } catch (Exception $e) {
    http_response_code(404);
    get_template_part('template-parts/page', '404');
  }
}

$content = ob_get_clean();
?>

<?php get_header(null, ["title" => $title, "description" => $description, "og_image" => $og_image]) ?>
<?php echo $content ?>
<?php get_footer() ?>
