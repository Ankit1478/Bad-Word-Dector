'use client';

import { useState } from 'react';
import {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} from 'obscenity';
import {
  checkChineseText,
  checkFrenchText,
  checkGermanText,
  checkGreekText,
  checkHebrewText,
  checkHindiText,
  checkItalianText,
  checkJapaneseText,
  checkKoreanText,
  checkPortugueseText,
  checkRussianText,
  checkSpanishText,
  checkThaiText,
  checkVietnameseText,
} from 'bad-words-checker';

const englishMatcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const Home = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('english');

  const checkText = () => {
    switch (language) {
      case 'hindi':
        setResult(checkHindiText(text));
        break;
      case 'chinese':
        setResult(checkChineseText(text));
        break;
      case 'german':
        setResult(checkGermanText(text));
        break;
      case 'french':
        setResult(checkFrenchText(text));
        break;
      case 'vietnamese':
        setResult(checkVietnameseText(text));
        break;
      case 'thai':
        setResult(checkThaiText(text));
        break;
      case 'spanish':
        setResult(checkSpanishText(text));
        break;
      case 'russian':
        setResult(checkRussianText(text));
        break;
      case 'portuguese':
        setResult(checkPortugueseText(text));
        break;
      case 'korean':
        setResult(checkKoreanText(text));
        break;
      case 'japanese':
        setResult(checkJapaneseText(text));
        break;
      case 'italian':
        setResult(checkItalianText(text));
        break;
      case 'hebrew':
        setResult(checkHebrewText(text));
        break;
      case 'greek':
        setResult(checkGreekText(text));
        break;
      case 'english':
        setResult(englishMatcher.hasMatch(text) ? 'Contains bad words' : 'No bad words found');
        break;
      default:
        setResult('No recognizable language found');
    }
  };

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bad Words Checker</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="chinese">Chinese</option>
        <option value="german">German</option>
        <option value="french">French</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="thai">Thai</option>
        <option value="spanish">Spanish</option>
        <option value="russian">Russian</option>
        <option value="portuguese">Portuguese</option>
        <option value="korean">Korean</option>
        <option value="japanese">Japanese</option>
        <option value="italian">Italian</option>
        <option value="hebrew">Hebrew</option>
        <option value="greek">Greek</option>
      </select>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        cols={30}
        placeholder="Enter text here..."
        className="w-full p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={checkText}
        className="mt-4 p-3 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Check
      </button>
      {result && (
        <p
          className={`mt-6 text-lg ${result.includes('Contains bad words') ? 'text-red-500' : 'text-green-500'}`}
        >
          {result}
        </p>
      )}
    </div>
  );
};


export default Home;
