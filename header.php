<?php
$page_title = sprintf("%s — %s", $args["title"], get_bloginfo('name'));
$description = $args["description"];
$og_image = $args["og_image"];
$permalink = get_the_permalink();
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width" />
	<meta name="description" content="<?php echo $description ?>" />

	<meta property="og:title" content="<?php echo $page_title ?>" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="<?php echo $og_image ?>" />
	<meta property="og:url" content="<?php echo $permalink ?>" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:alt" content="<?php echo $page_title ?>" />

	<meta property="og:description" content="<?php echo $description ?>" />
	<meta property="og:site_name" content="<?php bloginfo('name') ?>" />

	<?php wp_site_icon() ?>
	<link rel="stylesheet" href="<?php echo rb_get_versioned_href('style.css') ?>">

	<script src="<?php echo rb_get_versioned_href("assets/js/script.js") ?>" defer></script>
	<title><?php echo $page_title ?></title>
</head>

<body <?php body_class() ?>>

	<header class="site-header">
		<div class="site-header__leading">
			<?php echo wp_get_attachment_image(get_option('site_icon'), 'thumbnal', false, ["class" => "site-header__avatar"]) ?>
			<div class="site-header__text">
				<a class="site-header__name" href="/"><?php echo bloginfo('name') ?></a>
				<small class="site-header__subtitle">Designer + Developer</small>
			</div>
		</div>
		<nav class="site-nav">
			<ul class="site-nav__list | cluster">
				<?php foreach (['home', 'apps', 'projects'] as $slug): ?>
					<li>
						<?php $id = get_page_by_path($slug)->ID; ?>
						<a class="site-nav__link" href="<?php echo get_the_permalink($id) ?>"><?php echo get_the_title($id) ?></a>
					</li>
				<?php endforeach ?>
			</ul>
		</nav>
	</header>

	<main class="site-main">
