import { redirect } from '@sveltejs/kit';
import { locale } from '$lib/state/locale.svelte';

export const load = async () => {
    throw redirect(302, `/${locale.language}`)
}