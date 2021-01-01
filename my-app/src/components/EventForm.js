import React, { useContext, useState } from "react";
import {
  CREATE_EVENT,
  DELETE_ALL_EVENTS,
  ADD_OPERATION_LOG,
  DELETE_ADD_OPERATION_LOGS,
} from "../actions";
import AppContext from "../contexts/AppContext";
import { timeCurrentIso8601 } from "../utils"

const EventForm = () => {
  const { state, dispatch } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addEvent = (e) => {
    e.preventDefault();

    dispatch({
      type: CREATE_EVENT,
      title,
      body,
    });

    dispatch({
      type: ADD_OPERATION_LOG,
      description: "イベントを作成しました。",
      operatedAt: timeCurrentIso8601()
    })

    setTitle("");
    setBody("");
  };

  const deleteAllEvents = (e) => {
    e.preventDefault();
    const result = window.confirm(
      "全てのイベントを本当に削除しても良いですか？"
    );
    if (result) {
      dispatch({ type: DELETE_ALL_EVENTS });
      dispatch({
        type: ADD_OPERATION_LOG,
        description: "全てのイベントを削除しました。",
        operatedAt: timeCurrentIso8601()
      })
    }
  };

  const unCreatable = title === "" || body === "";
  return (
    <>
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

        <button
          className="btn btn-primary my-3"
          onClick={addEvent}
          disabled={unCreatable}
        >
          イベントを作成する
        </button>
        <button
          className="btn btn-danger my-3"
          onClick={deleteAllEvents}
          disabled={state.events.length === 0}
        >
          全てのイベントを削除する
        </button>
      </form>
    </>
  );
};

export default EventForm;
