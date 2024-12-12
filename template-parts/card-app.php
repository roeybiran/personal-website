<?php $id = $args["id"]; ?>
<div class="card card--styled card--app <?php echo get_field('store_id', $id) ? '' : "card--small" ?>">
  <div class="card__texts">
    <a class="card--app__title" href="<?php echo get_the_permalink($id) ?>"><?php echo get_the_title($id) ?></a>
    <p class="card--app__subtitle"><?php echo get_field('tagline', $id) ?></p>
  </div>
  <?php echo get_the_post_thumbnail($id, null, ["class" => "card--app__thumb"]) ?>
</div>
