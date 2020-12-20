export const HELPER_QUERIES = {
    getMaxIssueSuffix: 'select max(split_part(reverse(name), \'-\', 1)) from issue;'
}