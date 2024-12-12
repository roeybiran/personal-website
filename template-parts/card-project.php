<?php
$project = $args["project"];
$id = $args["project"]->ID;
$title = $project->post_title;
$date = date('M Y', strtotime($project->post_date));
$poster = get_the_post_thumbnail_url($id);

$tagline = get_field("tagline", $id);
$source_code = get_field('source_code', $id);
$home_page = get_field('home_page', $id);
$subtype = get_field("subtype", $id);
$responsibilities = get_field("responsibilities", $id);
$stack = get_field("stack", $id);
$press = get_field('press', $id);
$video = get_field("video", $id);
$featured_in = get_field("featured_in", $id);
$is_interaction = has_category('interactions', $id);
$is_icon = has_category('icons', $id);

?>
<div class="project-card <?php echo $is_icon ? "project-card--icon" : "" ?>">
  <div class="project-card__texts | stack">
    <div>
      <div>
        <div class="project-card__header">
          <p class="project-card__title"><?php echo $title ?></p>
          <div class="project-card__date">
            <dt class="sr-only">Date</dt>
            <dd class="project-card__badge"><?php echo $date ?></dd>
          </div>
        </div>
        <?php if ($tagline): ?>
          <p class="project-card__subtitle"><?php echo $tagline ?></p>
        <?php endif ?>
      </div>
    </div>
    <dl class="project-card__meta | grid">
      <?php if ($home_page || $source_code): ?>
        <div>
          <dt>Links</dt>
          <dd>
            <ul class="">
              <?php if ($home_page) : ?>
                <li>
                  <a class="project-card__link" target="_blank" href="<?php echo $home_page ?>">Home Page</a>
                </li>
              <?php endif; ?>
              <?php if ($source_code) : ?>
                <li>
                  <a class="project-card__link" target="_blank" href="<?php echo $source_code ?>">Source Code</a>
                </li>
              <?php endif; ?>
            </ul>
          </dd>
        </div>
      <?php endif ?>
      <?php if ($subtype): ?>
        <div>
          <dt>Kind</dt>
          <dd class="project-card__badge"><?php echo $subtype["label"] ?></dd>
        </div>
      <?php endif ?>
      <?php if (!empty($responsibilities) && !$is_interaction): ?>
        <div>
          <dt>Roles</dt>
          <dd>
            <ul class="">
              <?php foreach ($responsibilities as $resp): ?>
                <li class="project-card__badge"><?php echo $resp ?></li>
              <?php endforeach ?>
            </ul>
          </dd>
        </div>
      <?php endif ?>
      <div>
        <dt>Stack</dt>
        <dd>
          <ul class="">
            <?php foreach ($stack as $s): ?>
              <li class="project-card__badge"><?php echo $s ?></li>
            <?php endforeach ?>
          </ul>
        </dd>
      </div>
      <?php if (!empty($press)): ?>
        <div>
          <dt>Press</dt>
          <dd>
            <ul class="project-card__press">
              <?php foreach ($press as $row): ?>
                <?php $pr = $row["press"] ?>
                <li>
                  <a target="_blank" class="project-card__link" href="<?php echo $pr["url"] ?>"><?php echo $pr["title"] ?></a>
                </li>
              <?php endforeach ?>
            </ul>
          </dd>
        </div>
      <?php endif ?>
      <?php if (!empty($featured_in)): ?>
        <div>
          <dt>Featured In</dt>
          <dd>
            <ul class="project-card__featured-in">
              <?php
              usort($featured_in, function ($a, $b) {
                return strcmp($a->post_title, $b->post_title);
              });
              ?>
              <?php foreach ($featured_in as $feat): ?>
                <li>
                  <a class="project-card__featured-in-item" href="<?php echo get_the_permalink($feat->ID) ?>">
                    <?php echo get_the_post_thumbnail($feat->ID, 'post-thumbnail', ["class" => "project-card__featured-in-thumb"]) ?>
                    <span><?php echo $feat->post_title ?></span>
                  </a>
                </li>
              <?php endforeach ?>
            </ul>
          </dd>
        </div>
      <?php endif ?>
    </dl>
  </div>
  <video class="project-card__image" muted playsinline autoplay loop src="<?php echo $video["url"] ?>" poster="<?php echo $poster ?>"></video>
</div>
