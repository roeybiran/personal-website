<?php
$id = $args['id'];
$slug = get_post_field('post_name', $id);
$appcast = rb_parse_appcast($slug);
?>

<?php get_template_part('template-parts/nav', 'app', ["id" => $id]) ?>

<div class="page-content">
  <div class="stack">
    <figure class="app__cover-wrapper | center intrinsic">
      <?php echo wp_get_attachment_image(get_field("cover_image", $id), null, null, ["class" => "app__cover"]) ?>
    </figure>

    <div class="center intrinsic text">
      <figure class="app__icon-wrapper">
        <?php echo get_the_post_thumbnail($id, null, ["class" => "app__icon"]) ?>
      </figure>
      <div class="page--title">
        <h1><?php printf("<strong>%s.</strong> %s", get_the_title($id), get_field("tagline", $id)) ?></h1>
      </div>
      <div class="app__technicals">
        <small class="app__purchase-policy"><?php the_field('purchase_policy', $id) ?></small>
        <small class="app__sys-reqs"><?php echo $appcast["sys_reqs"] ?></small>
      </div>
    </div>

    <?php if (get_field('reviews', $id)) : ?>
      <section class="center intrinsic">
        <header class="sr-only">
          <h2>Reviews</h2>
        </header>
        <div class="app-reviews | reel">
          <?php foreach (get_field("reviews", $id) as $key => $review): ?>
            <div class="app-review">
              <blockquote>
                <p class="review__text"><?php echo $review['review'] ?></p>
              </blockquote>
              <?php
              /*
              <?php if ($review['rating']): ?>
                <span class="review__rating"><?php echo implode("", array_fill(0, $review['rating'], "⭑")) ?></span>
              <?php endif ?>
              */
              ?>
              <footer class="review__cite">
                — <?php printf('<a href="%s">%s, <cite>%s</cite></a>', $review["url"], $review["reviewer"], $review["publication"]) ?>
              </footer>
            </div>
          <?php endforeach ?>
        </div>
      </section>
    <?php endif ?>


    <div class="app-content content-editor | prose layout">
      <?php rb_get_the_content($id); ?>
      <ol class="footnotes">
        <?php foreach (get_field("footnotes", $id) as $idx => $footnote): ?>
          <li id="footnote-<?php echo $idx + 1 ?>"><?php echo $footnote["footnote_text"] ?></li>
        <?php endforeach ?>
      </ol>
    </div>
    <?php if (get_field("footnotes", $id)): ?>
    <?php endif ?>
  </div>

</div>
