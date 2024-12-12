<?php
$projects = get_posts([
  'post_type' => 'post',
  'category_name' => 'projects',
  'posts_per_page' => -1,
]);


$general = "General";
$interactions = "Interactions";
$icons = "Icons";

$categories = [
  $general => [],
  $interactions => [],
  $icons => []
];

foreach ($projects as $project) {
  $id = $project->ID;
  if (has_category('interactions', $id)) {
    $categories[$interactions][] = $project;
  } else if (has_category('icons', $id)) {
    $categories[$icons][] = $project;
  } else {
    $categories[$general][] = $project;
  }
}

?>
<div class="page-projects | page-content">
  <h1 class="sr-only"><?php the_title() ?></h1>
  <div class="stack">

    <nav class="page-projects__nav">
      <?php foreach ($categories as $title => $projects): ?>
        <?php if (empty($projects)) continue ?>
        <a class="page-projects__nav-item" href="#<?php echo $title ?>"><?php echo $title ?></a>
      <?php endforeach ?>
    </nav>
    <?php foreach ($categories as $title => $projects): ?>
      <?php if (empty($projects)) continue ?>
      <section class="page-projects__section" data-js-projects-section id="<?php echo $title ?>">
        <header class="sr-only"><?php echo $title ?></header>
        <ul class="projects-list | grid">
          <?php foreach ($projects as $project): ?>
            <li class="project-list__item"><?php get_template_part('template-parts/card', 'project', ["project" => $project]) ?></li>
          <?php endforeach ?>
        </ul>
      </section>
    <?php endforeach ?>

  </div>
</div>
