import React from "react";
import "./SideBar.css";
import { Sentence, WordObj } from "../../constants";
import WordBubble from "../WordBubble/WordBubble";
import ReactHtmlParser from "react-html-parser";

interface PropTypes {
  wordObjs: any;
  toggleEnable(wordObj: WordObj): void;
  scrollTo(sentNum: number): void;
  topSentences: Array<Sentence>;
}

interface StateTypes {
  selected: number;
}

class SideBar extends React.Component<PropTypes> {
  state: StateTypes = {
    selected: -1,
  };

  render() {
    const { wordObjs, toggleEnable, scrollTo, topSentences } = this.props;
    const { selected } = this.state;
    return (
      <div className="SideBar_Container">
        {Object.keys(wordObjs).length > 0 ? (
          <>
            {" "}
            <p className="SideBar_ToggleWordMsg">
              Select words to remove from search:
            </p>
            <div className="SideBar_ColorContainer">
              {Object.keys(wordObjs).map((word: string) => (
                <WordBubble
                  key={word}
                  wordObj={wordObjs[word]}
                  toggleEnable={() => toggleEnable(wordObjs[word])}
                />
              ))}
            </div>
            {topSentences.length === 0 && (
              <div className="NoResults">
                <img
                  className="NoResults_Image"
                  src={require("../../assets/sad.png")}
                  alt=""
                />
                <p>No Results</p>
              </div>
            )}
            {topSentences.map((sentence: Sentence) => (
              <div
                className={
                  selected === sentence.index
                    ? "SentenceContainer Sentence_Selected"
                    : "SentenceContainer"
                }
                key={sentence.index}
                onClick={() => {
                  this.setState({ selected: sentence.index });
                  scrollTo(sentence.index);
                }}
              >
                <p>{ReactHtmlParser(sentence.text)}</p>
                <img
                  alt=""
                  className="RightArrow"
                  src={require("../../assets/right.png")}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="NoResults">
            <img
              className="NoResults_Image"
              src={require("../../assets/search.png")}
              alt=""
            />
            <p>Start Searching...</p>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;
