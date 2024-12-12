<h1 class="sr-only"><?php the_title() ?></h1>
<div class="page-content | stack">
  <?php get_template_part('template-parts/grid', 'app', ["main_apps_only" => false]) ?>
</div>

<?php
/*

<ul class="center stack">
    <?php foreach (get_field('misc_apps', get_the_ID()) as $misc_app) : ?>
      <li class="card card--styled card--app card--small">
        <div class="card__texts">
          <a class="card--app__title" target="_blank" href="<?php echo $misc_app['url'] ?>"><?php echo $misc_app['name'] ?></a>
          <small class="card--app__subtitle"><?php echo $misc_app['tagline'] ?></small>
        </div>
        <?php echo wp_get_attachment_image($misc_app['icon'], null, null, ["class" => "card--app__thumb"]) ?>
      </li>
    <?php endforeach ?>
  </ul>
*/
?>
