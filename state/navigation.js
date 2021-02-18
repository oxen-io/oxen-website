"use strict";
exports.__esModule = true;
exports.collapseMobileHeader = exports.expandMobileHeaderMenu = exports.setSplitPagesContent = exports.collapseSideMenu = exports.expandSideMenu = exports.setPostTitle = exports.setPageType = exports.setHeaderCollapsed = exports.NavigationActions = exports.initialNavigationState = exports.PageType = exports.SideMenuItem = void 0;
var SideMenuItem;
(function (SideMenuItem) {
    SideMenuItem["BUILD"] = "BUILD";
    SideMenuItem["BUY_OXEN"] = "BUY_OXEN";
    SideMenuItem["WHO_ARE_WE"] = "WHO_ARE_WE";
    SideMenuItem["STAKE"] = "STAKE";
    SideMenuItem["USES"] = "USES";
    SideMenuItem["SESSION_LOKINET"] = "SESSION_LOKINET";
    SideMenuItem["GET_INVOLVED"] = "GET_INVOLVED";
    SideMenuItem["ROADMAP"] = "ROADMAP";
})(SideMenuItem = exports.SideMenuItem || (exports.SideMenuItem = {}));
var PageType;
(function (PageType) {
    PageType["NORMAL"] = "NORMAL";
    PageType["BLOG"] = "BLOG";
    PageType["POST"] = "POST";
})(PageType = exports.PageType || (exports.PageType = {}));
exports.initialNavigationState = {
    // Side menu expanded only toggles for mobile.
    // On desktop it's always open (if it fits).
    pageType: PageType.NORMAL,
    postTitle: undefined,
    headerCollapsed: true,
    sideMenuExpanded: false,
    headerMobileMenuExpanded: false
};
var NavigationActions;
(function (NavigationActions) {
    NavigationActions["SET_HEADER_COLLAPSED"] = "SET_HEADER_COLLAPSED";
    NavigationActions["SET_PAGE_TYPE"] = "SET_PAGE_TYPE";
    NavigationActions["SET_POST_TITLE"] = "SET_POST_TITLE";
    NavigationActions["EXPAND_SIDE_MENU"] = "EXPAND_SIDE_MENU";
    NavigationActions["COLLAPSE_SIDE_MENU"] = "COLLAPSE_SIDE_MENU";
    NavigationActions["SET_SPLIT_PAGES_CONTENT"] = "SET_SPLIT_PAGES_CONTENT";
    NavigationActions["EXPAND_MOBILE_HEADER_MENU"] = "EXPAND_MOBILE_HEADER_MENU";
    NavigationActions["COLLAPSE_MOBILE_HEADER_MENU"] = "COLLAPSE_MOBILE_HEADER_MENU";
})(NavigationActions = exports.NavigationActions || (exports.NavigationActions = {}));
// ////////////////////////////// //
//         Action Creators        //
// ////////////////////////////// //
var setHeaderCollapsed = function (collapsed) { return ({
    type: NavigationActions.SET_HEADER_COLLAPSED,
    payload: collapsed
}); };
exports.setHeaderCollapsed = setHeaderCollapsed;
var setPageType = function (type) { return ({
    type: NavigationActions.SET_PAGE_TYPE,
    payload: type
}); };
exports.setPageType = setPageType;
// For sidebar title
var setPostTitle = function (title) { return ({
    type: NavigationActions.SET_POST_TITLE,
    payload: title
}); };
exports.setPostTitle = setPostTitle;
var expandSideMenu = function () { return ({
    type: NavigationActions.EXPAND_SIDE_MENU
}); };
exports.expandSideMenu = expandSideMenu;
var collapseSideMenu = function () { return ({
    type: NavigationActions.COLLAPSE_SIDE_MENU
}); };
exports.collapseSideMenu = collapseSideMenu;
var setSplitPagesContent = function (pages) { return ({
    type: NavigationActions.SET_SPLIT_PAGES_CONTENT,
    payload: pages
}); };
exports.setSplitPagesContent = setSplitPagesContent;
var expandMobileHeaderMenu = function () { return ({
    type: NavigationActions.EXPAND_MOBILE_HEADER_MENU
}); };
exports.expandMobileHeaderMenu = expandMobileHeaderMenu;
var collapseMobileHeader = function () { return ({
    type: NavigationActions.COLLAPSE_MOBILE_HEADER_MENU
}); };
exports.collapseMobileHeader = collapseMobileHeader;
