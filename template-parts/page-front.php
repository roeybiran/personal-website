<h1 class="sr-only"><?php the_title() ?></h1>
<div class="page-content | stack">
  <div class="content-editor | prose layout">
    <?php the_content(); ?>
  </div>
  <?php get_template_part('template-parts/grid', 'app') ?>
</div>
