import { useEffect, useState } from "react";
import { api } from "../services/api";

import { Button } from "./Button";

import MenuIcon from "../assets/menu.svg";
import CloseIcon from "../assets/x.svg";

import "../styles/sidebar.scss";
import "../styles/sidebar-responsive.scss";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SidebarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: SidebarProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  function handleToggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <>
      <button className="toggle-menu" onClick={handleToggleMenu}>
        {showMenu ? (
          <img src={CloseIcon} alt="close-menu" />
        ) : (
          <img src={MenuIcon} alt="menu" />
        )}
      </button>

      <nav className={`sidebar ${!showMenu ? "is-inactive" : "fullscreen"}`}>
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
