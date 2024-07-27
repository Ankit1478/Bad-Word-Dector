declare module 'profanity-filter' {
    interface ProfanityFilterOptions {
        languages?: string[];
    }

    class ProfanityFilter {
        constructor(options?: ProfanityFilterOptions);
        isProfane(text: string): boolean;
        censor(text: string): string;
    }

    export { ProfanityFilter };
}
