import { useState } from "react";
import "./style.css";
export default function TableHeader({
  columns = 1,
  col1,
  col2,
  col3,
  col4,
  col5,
  sortCol1,
  sortCol2,
  sortCol3,
  sortCol4,
  sortCol5,
}) {
  const [activeSort, setActiveSort] = useState(false);

  return (
    <div
      className="container-table-header"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {" "}
      {col1 && (
        <div className="inner-col-header-table-content">
          <span>{col1}</span>

          {sortCol1 && (
            <button
              className={`sort-button-table-header ${
                activeSort ? "sort-button-table-header-active" : ""
              }`}
              onClick={() => setActiveSort(!activeSort)} // alterna
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          )}
        </div>
      )}
      {col2 && (
        <div className="inner-col-header-table-content">
          <span>{col2}</span>

          {sortCol2 && (
            <button
              className={`sort-button-table-header ${
                activeSort ? "sort-button-table-header-active" : ""
              }`}
              onClick={() => setActiveSort(!activeSort)} // alterna
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          )}
        </div>
      )}{" "}
      {col3 && (
        <div className="inner-col-header-table-content">
          <span>{col3}</span>

          {sortCol3 && (
            <button
              className={`sort-button-table-header ${
                activeSort ? "sort-button-table-header-active" : ""
              }`}
              onClick={() => setActiveSort(!activeSort)} // alterna
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          )}
        </div>
      )}{" "}
      {col4 && (
        <div className="inner-col-header-table-content">
          <span>{col4}</span>

          {sortCol4 && (
            <button
              className={`sort-button-table-header ${
                activeSort ? "sort-button-table-header-active" : ""
              }`}
              onClick={() => setActiveSort(!activeSort)} // alterna
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          )}
        </div>
      )}
      {col5 && (
        <div className="inner-col-header-table-content">
          <span>{col5}</span>

          {sortCol5 && (
            <button
              className={`sort-button-table-header ${
                activeSort ? "sort-button-table-header-active" : ""
              }`}
              onClick={() => setActiveSort(!activeSort)} // alterna
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
