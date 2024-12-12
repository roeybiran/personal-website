<?php

$main_apps_only = $args["main_apps_only"] ?? true;

$main = [];
$misc = [];

$posts = get_posts([
  "category" => "apps",
  'meta_key' => 'store_id',
  'meta_query' =>
  $main_apps_only ? [
    [
      'key' => 'store_id',
      'value'   => '',
      'compare' => '!=',
    ],
  ] : null,
  'orderby' => [
    'meta_value' => "ASC",
    'date' => "DESC"
  ]
]);

foreach ($posts as $post) {
  if (get_field('store_id', $post->ID)) {
    $main[] = $post;
  } else {
    $misc[] = $post;
  }
}

?>
<ul class="grid--apps">
  <?php foreach (array_merge($main, $misc) as $app): ?>
    <?php get_template_part('template-parts/card', 'app', ["id" => $app->ID]) ?>
  <?php endforeach ?>
</ul>
