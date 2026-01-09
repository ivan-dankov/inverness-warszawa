declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"en/at-what-age-to-pierce-child-ears.md": {
	id: "en/at-what-age-to-pierce-child-ears.md";
  slug: "at-what-age-to-pierce-child-ears";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"en/does-ear-piercing-hurt.md": {
	id: "en/does-ear-piercing-hurt.md";
  slug: "does-ear-piercing-hurt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"en/how-to-prepare-a-child-for-ear-piercing-warsaw.md": {
	id: "en/how-to-prepare-a-child-for-ear-piercing-warsaw.md";
  slug: "how-to-prepare-a-child-for-ear-piercing-warsaw";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"en/inverness-vs-gun.md": {
	id: "en/inverness-vs-gun.md";
  slug: "inverness-vs-gun";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pl/czy-przekluwanie-uszu-boli.md": {
	id: "pl/czy-przekluwanie-uszu-boli.md";
  slug: "czy-przekluwanie-uszu-boli";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pl/inverness-vs-pistolet.md": {
	id: "pl/inverness-vs-pistolet.md";
  slug: "inverness-vs-pistolet";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pl/jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa.md": {
	id: "pl/jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa.md";
  slug: "jak-przygotowac-dziecko-do-przekluwania-uszu-warszawa";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"pl/od-jakiego-wieku-przekluwac-uszy-dziecku.md": {
	id: "pl/od-jakiego-wieku-przekluwac-uszy-dziecku.md";
  slug: "od-jakiego-wieku-przekluwac-uszy-dziecku";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ru/bolit-li-prokalyvanie-ushey.md": {
	id: "ru/bolit-li-prokalyvanie-ushey.md";
  slug: "bolit-li-prokalyvanie-ushey";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ru/inverness-vs-pistolet.md": {
	id: "ru/inverness-vs-pistolet.md";
  slug: "inverness-vs-pistolet";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ru/kak-podgotovit-rebenka-k-prokolu-ushey-varshava.md": {
	id: "ru/kak-podgotovit-rebenka-k-prokolu-ushey-varshava.md";
  slug: "kak-podgotovit-rebenka-k-prokolu-ushey-varshava";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"ru/s-kakogo-vozrasta-prokalyvat-ushi-rebenku.md": {
	id: "ru/s-kakogo-vozrasta-prokalyvat-ushi-rebenku.md";
  slug: "s-kakogo-vozrasta-prokalyvat-ushi-rebenku";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"uk/chy-bolyt-prokol-vukh.md": {
	id: "uk/chy-bolyt-prokol-vukh.md";
  slug: "chy-bolyt-prokol-vukh";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"uk/inverness-vs-pistolet.md": {
	id: "uk/inverness-vs-pistolet.md";
  slug: "inverness-vs-pistolet";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"uk/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava.md": {
	id: "uk/yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava.md";
  slug: "yak-pidhotuvaty-dytynu-do-prokolyuvannya-vuh-varshava";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"uk/z-yakoho-viku-prokoluvaty-vukha-dytyni.md": {
	id: "uk/z-yakoho-viku-prokoluvaty-vukha-dytyni.md";
  slug: "z-yakoho-viku-prokoluvaty-vukha-dytyni";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"translations": {
"en": {
	id: "en";
  collection: "translations";
  data: any
};
"pl": {
	id: "pl";
  collection: "translations";
  data: any
};
"ru": {
	id: "ru";
  collection: "translations";
  data: any
};
"uk": {
	id: "uk";
  collection: "translations";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
