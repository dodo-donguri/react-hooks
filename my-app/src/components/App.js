import React, { useReducer, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Event from "../components/Event"
import reducer from "../reducers";

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: "CREATE_EVENT",
      title,
      body,
    });
    setTitle("");
    setBody("");
  };

  const deleteAllEvents = e => {
    e.preventDefault()
    const result =　window.confirm("全てのイベントを本当に削除しても良いですか？")
    if(result) {
      dispatch({ type: "DELETE_ALL_EVENTS" })
    }
  }

  const unCreatable = title === "" || body === ""
  return (
    <div className="container-fluid">
      <h4>イベント作成フォーム</h4>
      <form>
        <div className="form-grup">
          <label htmlFor="formEventTitle">タイトル</label>
          <input
            className="form-control"
            id="formEventTitle"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="form-grup mt-3">
          <label htmlFor="formEventBody">ボディー</label>
          <textarea
            className="form-control"
            id="formEventBody"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>

        <button className="btn btn-primary my-3" onClick={addEvent} disabled={unCreatable}>
          イベントを作成する
        </button>
        <button className="btn btn-danger my-3" onClick={deleteAllEvents} disabled={state.length === 0}>
          全てのイベントを削除する
        </button>
      </form>

      <h4>イベント一覧</h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>ボディー</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.map((event, index) => {
            return(
              <Event key={index} event={event} dispatch={dispatch} />
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
