import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ScreenContext } from '../../contexts/screen';
import { useSearch } from '../../hooks/search';
import { IState } from '../../state/reducers';
import { SVG } from '../../types';
import { Button } from '../Button';
import { ArticleCard } from '../cards/ArticleCard';

interface IDynamicOptions {
  name: string;
  href: string;
  svg: SVG;
}

const dynamicCategories: Array<IDynamicOptions> = [
  { name: 'Trending', href: '/search/trending', svg: null as SVG },
  { name: 'New!', href: '/search/new', svg: null as SVG },
];

export function SearchOverlayInner() {
  const searchState = useSelector((state: IState) => state.search);

  const renderSearchResults =
    searchState.searchQuery.length > 0 &&
    searchState.searchResultItems?.length > 0;

  const renderSearchDefaltTemplate =
    searchState?.searchQuery?.length === 0 ||
    (searchState?.searchQuery?.length > 0 &&
      searchState.searchResultItems?.length === 0);

  const renderSearchNoResults =
    searchState.searchQuery.length > 0 &&
    searchState?.searchResultItems?.length === 0;

  const { isMobile } = useContext(ScreenContext);
  const router = useRouter();

  return (
    <>
      <div className={classNames('w-full', isMobile ? 'px-0' : 'px-4')}>
        <div className="border-secondary border-opacity-50 border-t-2"></div>
      </div>

      {renderSearchResults && <SearchOverlayInnerResults />}
      {renderSearchDefaltTemplate && <SearchOverlayInnerDefault />}
    </>
  );
}

function SearchOverlayInnerDefault() {
  const { searchBarPinnedToHeader } = useSelector(
    (state: IState) => state.search,
  );

  const { isMobile } = useContext(ScreenContext);
  const router = useRouter();

  return (
    <div
      className={classNames(
        'w-full px-4',
        isMobile && 'flex flex-col h-full justify-between',
      )}
    >
      {/* FEATURED DYNAMIC CATEGORIES */}
      <div className="flex flex-col space-y-1 mt-4">
        {dynamicCategories.map(category => (
          <div
            key={category.name.toLowerCase()}
            onClick={() => router.push(category.href)}
            className="flex items-center text-lg cursor-pointer text-primary font-roboto font-medium rounded-lg hover:bg-primary hover:bg-opacity-10"
          >
            <category.svg className="h-8 mr-2" />
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function SearchOverlayInnerResults() {
  const { results: allResults, query: searchQuery } = useSearch();
  const { isMobile } = useContext(ScreenContext);
  const router = useRouter();

  // Sort results by popularity and filter down to four results
  console.log('Results', allResults);
  const results = allResults?.slice(0, 4);

  return (
    <>
      <div
        className={classNames('flex flex-wrap', [
          isMobile ? 'mt-10 px-0' : 'mt-6 px-4',
          `children:odd:${isMobile ? 'pr-4' : 'pr-2'}`,
          `children:even:${isMobile ? 'pl-4' : 'pl-2'}`,
        ])}
      >
        {results?.map(card => (
          <div key={card.id.toLowerCase()} className={classNames('w-1/2 mb-8')}>
            <ArticleCard {...card} />
          </div>
        ))}
      </div>
      <div
        className={classNames(
          'flex w-full justify-center px-6',
          isMobile ? 'mb-6' : 'mb-0',
        )}
      >
        <Button
          color="primary"
          size={isMobile ? 'medium' : 'small'}
          onClick={() =>
            router.push({
              pathname: '/search',
              query: { s: searchQuery },
            })
          }
        >
          See all results
        </Button>
      </div>
    </>
  );
}
