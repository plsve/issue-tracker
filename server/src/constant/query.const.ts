export const HELPER_QUERIES = {
    getMaxIssueNameSuffix: 'select max(split_part(reverse(name), \'-\', 1)) from issue;'
}