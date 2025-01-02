import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    categorie?: EntryFieldTypes.EntryLink<TypeCategorieSkeleton>;
    thumbnail?: EntryFieldTypes.AssetLink;
    vedette?: EntryFieldTypes.Boolean;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeFormulaireSkeleton | TypeGallerieSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
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

export interface TypeChampFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Email" | "Options" | "Phone" | "Text" | "Textarea">;
    half?: EntryFieldTypes.Boolean;
    options?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeChampSkeleton = EntrySkeletonType<TypeChampFields, "champ">;
export type TypeChamp<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeChampSkeleton, Modifiers, Locales>;

export function isTypeChamp<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeChamp<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'champ'
}

export interface TypeFormulaireFields {
    titre?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    action?: EntryFieldTypes.Symbol;
    bouton?: EntryFieldTypes.Symbol;
    champs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeChampSkeleton>>;
    couleur?: EntryFieldTypes.Symbol<"aqua" | "aqua-pale" | "beige" | "beige-pale" | "blanc" | "bleu" | "bleu-fonce" | "bleu-pale" | "bourgogne" | "brun" | "jaune" | "mauve" | "mauve-fonce" | "mauve-pale" | "noir" | "rose" | "rose-pale" | "sarcelle" | "vert" | "vert-fonce" | "vert-pale">;
}

export type TypeFormulaireSkeleton = EntrySkeletonType<TypeFormulaireFields, "formulaire">;
export type TypeFormulaire<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFormulaireSkeleton, Modifiers, Locales>;

export function isTypeFormulaire<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeFormulaire<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'formulaire'
}

export interface TypeGallerieFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    type?: EntryFieldTypes.Symbol<"Descriptions" | "Slider">;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeGallerieSkeleton = EntrySkeletonType<TypeGallerieFields, "gallerie">;
export type TypeGallerie<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGallerieSkeleton, Modifiers, Locales>;

export function isTypeGallerie<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGallerie<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'gallerie'
}

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    mobileMedia?: EntryFieldTypes.AssetLink;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    full?: EntryFieldTypes.Boolean;
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
    type?: EntryFieldTypes.Symbol<"Accordeon" | "Colonnes" | "Italics" | "Pilules" | "Slider" | "Timeline">;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeListSkeleton | TypeQuestionSkeleton | TypeTextSkeleton>>;
}

export type TypeListSkeleton = EntrySkeletonType<TypeListFields, "list">;
export type TypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListSkeleton, Modifiers, Locales>;

export function isTypeList<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeList<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'list'
}

export interface TypeNavigationFields {
    id?: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    liensBonus?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
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
    couleur?: EntryFieldTypes.Symbol<"aqua-pale" | "beige-pale" | "blanc" | "bleu-pale" | "mauve-pale" | "rose-pale" | "sarcelle" | "vert-pale">;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeFormulaireSkeleton | TypeGallerieSkeleton | TypeHeroSkeleton | TypeListSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeQuestionFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    corps?: EntryFieldTypes.RichText;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    couleur?: EntryFieldTypes.Symbol<"aqua" | "aqua-pale" | "beige" | "beige-pale" | "blanc" | "bleu" | "bleu-fonce" | "bleu-pale" | "bourgogne" | "brun" | "jaune" | "mauve" | "mauve-fonce" | "mauve-pale" | "noir" | "rose" | "rose-pale" | "sarcelle" | "vert" | "vert-fonce" | "vert-pale">;
}

export type TypeQuestionSkeleton = EntrySkeletonType<TypeQuestionFields, "question">;
export type TypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeQuestionSkeleton, Modifiers, Locales>;

export function isTypeQuestion<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeQuestion<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'question'
}

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    corps?: EntryFieldTypes.RichText;
    full?: EntryFieldTypes.Boolean;
    alt?: EntryFieldTypes.Boolean;
    vertical?: EntryFieldTypes.Boolean;
    petitMedia?: EntryFieldTypes.Boolean;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    couleur?: EntryFieldTypes.Symbol<"aqua" | "aqua-pale" | "beige" | "beige-pale" | "blanc" | "bleu" | "bleu-fonce" | "bleu-pale" | "bourgogne" | "brun" | "jaune" | "mauve" | "mauve-fonce" | "mauve-pale" | "noir" | "rose" | "rose-pale" | "sarcelle" | "vert" | "vert-fonce" | "vert-pale">;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
