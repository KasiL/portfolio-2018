<?php
/**
 * Handle ajax requests to resolve post content.
 *
 * @since 3.17.2
 *
 * @return void
 */
function et_builder_ajax_resolve_post_content() {
	$_         = ET_Core_Data_Utils::instance();
	$nonce     = isset( $_POST['nonce'] ) ? $_POST['nonce'] : '';
	$nonce     = sanitize_text_field( $nonce );
	$post_id   = isset( $_POST['post_id'] ) ? (int) $_POST['post_id'] : 0;
	$groups    = isset( $_POST['groups'] ) && is_array( $_POST['groups'] ) ? $_POST['groups'] : array();
	$overrides = isset( $_POST['overrides'] ) && is_array( $_POST['overrides'] ) ? $_POST['overrides'] : array();
	$overrides = array_map( 'wp_kses_post', $overrides );
	$post      = get_post( $post_id );

	$invalid_nonce       = ! wp_verify_nonce( $nonce, 'et_fb_resolve_post_content' );
	$invalid_permissions = ! current_user_can( 'edit_post', $post_id );
	$invalid_post        = null === $post;

	if ( $invalid_nonce || $invalid_permissions || $invalid_post ) {
		et_core_die();
	}

	$response = array();

	foreach ( $groups as $hash => $field_group ) {
		$group             = sanitize_text_field( isset( $field_group['group'] ) ? (string) $field_group['group'] : '' );
		$field             = isset( $field_group['field'] ) ? sanitize_text_field( (string) $field_group['field'] ) : '';
		$settings          = isset( $field_group['settings'] ) && is_array( $field_group['settings'] ) ? wp_unslash( $field_group['settings'] ) : array();
		$settings          = array_map( 'wp_kses_post', $settings );
		$is_content        = $_->array_get( $field_group, 'attribute' ) === 'content';
		$response[ $hash ] = apply_filters( "et_builder_resolve_{$group}_post_content_field", $field, $settings, $post_id, $overrides, $is_content );
	}

	wp_send_json_success( $response );
}
add_action( 'wp_ajax_et_builder_resolve_post_content', 'et_builder_ajax_resolve_post_content' );

/**
 * List terms for a given post.
 *
 * @since 3.17.2
 *
 * @param array $terms
 * @param boolean $link
 * @param string $separator
 *
 * @return string
 */
function et_builder_list_terms( $terms, $link = true, $separator = ' | ' ) {
	$output = array();

	foreach ( $terms as $term ) {
		$label = esc_html( $term->name );

		if ( $link ) {
			$label = sprintf(
				'<a href="%1$s">%2$s</a>',
				esc_url( get_term_link( $term ) ),
				et_core_esc_previously( $label )
			);
		}

		$output[] = $label;
	}

	return implode( esc_html( $separator ), $output );
}

/**
 * Get the title for the current page be it a post, a tax archive, search etc.
 *
 * @since 4.0
 *
 * @param integer $post_id
 *
 * @return string
 */
function et_builder_get_current_title( $post_id = 0 ) {
	if ( 0 === $post_id ) {
		$post_id = get_the_ID();
	}

	$post_id = (int) $post_id;

	if ( is_singular() ) {
		return get_the_title( $post_id );
	}

	if ( is_front_page() ) {
		return __( 'Home', 'et_builder' );
	}

	if ( is_home() ) {
		return __( 'Blog', 'et_builder' );
	}

	if ( is_404() ) {
		return __( 'No Results Found', 'et_builder' );
	}

	if ( is_search() ) {
		return sprintf( __( 'Results for "%1$s"', 'et_builder' ), get_search_query() );
	}

	if ( is_author() ) {
		return get_the_author();
	}

	if ( is_post_type_archive() ) {
		return post_type_archive_title( '', false );
	}

	if ( is_category() || is_tag() || is_tax() ) {
		return single_term_title( '', false );
	}

	return get_the_archive_title();
}