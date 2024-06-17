import React, { useState } from 'react';
import './ParagraphGenerator.css';

const ParagraphGenerator = () => {
  const [numWords, setNumWords] = useState('');
  const [paragraph, setParagraph] = useState('');

  const generateParagraph = () => {
    const yourWordList = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nihil enim iam habes, quod ad corpus referas; Videsne quam sit magna dissensio? Atque his de rebus et splendida est eorum et illustris oratio. Sed non alienum est, quo facilius vis verbi intellegatur, rationem huius verbi faciendi Zenonis exponere. Neque solum ea communia, verum etiam paria esse dixerunt. Quis est, qui non oderit libidinosam, protervam adolescentiam? Si enim ad populum me vocas, eum. Sed quanta sit alias, nunc tantum possitne esse tanta. Duo Reges: constructio interrete. Quis est, qui non oderit libidinosam, protervam adolescentiam?".split(' ');
    
    let generatedText = '';
    for (let i = 0; i < numWords; i++) {
      const randomIndex = Math.floor(Math.random() * yourWordList.length);
      generatedText += yourWordList[randomIndex] + ' ';
    }
    
    setParagraph(generatedText.trim());
  };

return (
    <div className="paragraph-generator">
      <h1>Paragraph Generator</h1>
      <div className="input-group">
        <input
          type="number"
          placeholder="Enter Number of Words"
          value={numWords}
          onChange={(e) => setNumWords(e.target.value)}
        />
        <button onClick={generateParagraph}>Generate</button>
      </div>
      <p>{paragraph}</p>
    </div>
  );
};

export default ParagraphGenerator;