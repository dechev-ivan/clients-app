export function useMediaQuery(query: string) {
    const matches = ref(false);

    onMounted(() => {
        const mediaQuery = window.matchMedia(query);
        matches.value = mediaQuery.matches;

        const handler = (e: MediaQueryListEvent) => {
            matches.value = e.matches;
        };

        mediaQuery.addEventListener('change', handler);
        onBeforeUnmount(() => {
            mediaQuery.removeEventListener('change', handler);
        });
    });

    return matches;
}
