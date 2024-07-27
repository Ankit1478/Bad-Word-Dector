import {
    RegExpMatcher,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';

const createMatcher = (language: string): RegExpMatcher => {
    switch (language.toLowerCase()) {
        case 'english':
            return new RegExpMatcher({
                ...englishDataset.build(),
                ...englishRecommendedTransformers,
            });
        // Add cases for other languages here
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
};

export const detectProfanity = (text: string, language: string = 'english'): boolean => {
    const matcher = createMatcher(language);
    return matcher.hasMatch(text);
};