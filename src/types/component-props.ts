/**
 * Shared component prop interfaces for language-aware components
 */

export interface LanguageAwareProps {
  currentLang: string;
}

export interface HeaderProps extends LanguageAwareProps {}
export interface HeroProps extends LanguageAwareProps {}
export interface ServicesProps extends LanguageAwareProps {}
export interface IndexProps extends LanguageAwareProps {}
