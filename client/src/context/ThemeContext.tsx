import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getFromLocalStorage, saveInLocalStorage } from '../helpers/auth';

// Определяем типы для темы
type Theme = 'light' | 'dark';

// Определяем типы для контекста
interface ThemeContextType {
      theme: Theme;
      toggleTheme: () => void;
}

// Создаем контекст с начальными значениями
const ThemeContext = createContext<ThemeContextType>({
      theme: 'dark',
      toggleTheme: () => { },
});

// Создаем провайдер для контекста
interface ThemeProviderProps {
      children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
      const [theme, setTheme] = useState<Theme>('dark');

      // Функция для переключения темы
      const toggleTheme = () => {
            setTheme(prevTheme => {
                  const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
                  saveInLocalStorage('theme', newTheme);
                  return newTheme;
            });
      };

      // Значение, передаваемое провайдером
      const contextValue: ThemeContextType = {
            theme,
            toggleTheme,
      };

      // Получение и установка темы выбранного пользователя
      useEffect(() => {
            const savedTheme = getFromLocalStorage('theme');
            if (savedTheme) {
                  setTheme(savedTheme)
            }
      }, [])

      // Добавление темы для html тега
      useEffect(() => {
            const htmlTag = document.querySelector('html');
            if (htmlTag) {
                  htmlTag.className = theme === 'light' ? 'light' : 'dark';
            }

      }, [theme])
      return (
            <ThemeContext.Provider value={contextValue}>
                  <div className={`app ${theme}`}>
                        {children}
                  </div>
            </ThemeContext.Provider>
      );
};

// Создаем кастомный хук для использования контекста
const useTheme = (): ThemeContextType => useContext(ThemeContext);

export { ThemeProvider, useTheme };