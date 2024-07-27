'use client';

import { useState } from 'react';
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';
import { checkChineseText, checkHindiText, } from 'bad-words-checker';

const englishMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const Home = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('english');

  const checkText = () => {
    if (language === 'hindi') {
      const containsEnglish = /[a-zA-Z]/.test(text);
      if (containsEnglish) {
        setResult('Hindi text should not contain English letters.');
        return;
      }
      const hindiResult = checkHindiText(text);
      setResult(hindiResult);
    } else if (language === 'chinese') {
      const chineseResult = checkChineseText(text);
      setResult(chineseResult);
    } else if (language === 'english') {
      const englishResult = englishMatcher.hasMatch(text);
      setResult(englishResult ? 'Contains bad words' : 'No bad words found');
    } else {
      setResult('No recognizable language found');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bad Words Checker</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px' }}
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="chinese">Chinese</option>
      </select>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={30}
        placeholder="Enter text here..."
        style={{ width: '100%', padding: '10px' }}
      />
      <button
        onClick={checkText}
        style={{ marginTop: '10px', padding: '10px 20px' }}
      >
        Check
      </button>
      {result && (
        <p
          style={{
            marginTop: '20px',
            color: result.includes('Contains bad words') ? 'red' : 'green'
          }}
        >
          {result}
        </p>
      )}
    </div>
  );
};

export default Home;
