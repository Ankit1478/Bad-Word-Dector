import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            try {
                const response = await axios.post('/api/detectProfanity', { text });
                setResult(response.data.hasProfanity ? 'Yes' : 'No');
            } catch (error) {
                console.error('Error detecting profanity:', error);
                setResult('Error occurred');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <h1>Profanity Detection</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept=".txt,.pdf" />
                <button type="submit">Check Profanity</button>
            </form>
            {result && <p>Profanity detected: {result}</p>}
        </div>
    );
}