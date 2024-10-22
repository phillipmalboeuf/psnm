import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    categorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    thumbnail?: EntryFieldTypes.AssetLink;
    vedette?: EntryFieldTypes.Boolean;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export function isTypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArticle<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'article'
}

export interface TypeCategorieFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    couleur?: EntryFieldTypes.Symbol<"aqua" | "aqua-pale" | "beige" | "beige-pale" | "blanc" | "bleu" | "bleu-fonce" | "bleu-pale" | "bourgogne" | "brun" | "jaune" | "mauve" | "mauve-fonce" | "mauve-pale" | "noir" | "rose" | "rose-pale" | "sarcelle" | "vert" | "vert-fonce" | "vert-pale">;
}

export type TypeCategorieSkeleton = EntrySkeletonType<TypeCategorieFields, "categorie">;
export type TypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorieSkeleton, Modifiers, Locales>;

export function isTypeCategorie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategorie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'categorie'
}

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeLienDeNavigationFields {
    titre?: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
    sousLiens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    extraBouton?: EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>;
}

export type TypeLienDeNavigationSkeleton = EntrySkeletonType<TypeLienDeNavigationFields, "lienDeNavigation">;
export type TypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLienDeNavigationSkeleton, Modifiers, Locales>;

export function isTypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLienDeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'lienDeNavigation'
}

export interface TypeListFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Accordeon" | "Colonnes" | "Italics" | "Pilules" | "Slider">;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    id?: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeHeroSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    corps?: EntryFieldTypes.RichText;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    couleur?: EntryFieldTypes.Symbol<"aqua" | "aqua-pale" | "beige" | "beige-pale" | "blanc" | "bleu" | "bleu-fonce" | "bleu-pale" | "bourgogne" | "brun" | "jaune" | "mauve" | "mauve-fonce" | "mauve-pale" | "noir" | "rose" | "rose-pale" | "sarcelle" | "vert" | "vert-fonce" | "vert-pale">;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
