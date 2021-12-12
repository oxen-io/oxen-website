import { ReactElement, useContext } from 'react';

import { Contained } from '@/components/Contained';
import ReactPaginate from 'react-paginate';
import { ScreenContext } from '@/contexts/screen';

interface Props {
  currentPage: number;
  pageCount: number;
  paginationHandler: (page: any) => void;
}

export default function Pagination(props: Props): ReactElement {
  const { currentPage, pageCount, paginationHandler } = props;
  const { isMobile } = useContext(ScreenContext);

  // Mobile Pagination Settings
  const MAX_PAGINATION_BUTTONS_MOBILE = 5; // On mobile, we want to only have a maximum of 5 pagination buttons
  const hasTooManyButtons =
    isMobile && pageCount > MAX_PAGINATION_BUTTONS_MOBILE; // Check if the maximum number of pagination buttons have been reached
  const EDGE_PAGES = [1, 2, pageCount - 1, pageCount]; // Check if the current page is an edge page, to keep the number of pagination buttons consistent
  const isEdgePage = isMobile && EDGE_PAGES.includes(currentPage);

  return (
    <Contained>
      <div className="flex justify-center mb-4">
        <div className="mt-6 tablet:mt-4">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active bg-secondary'}
            containerClassName={'pagination bg-primary text-white'}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            marginPagesDisplayed={hasTooManyButtons && !isEdgePage ? 1 : 2}
            pageRangeDisplayed={isMobile ? 1 : 2}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </Contained>
  );
}
