export function getMemberTemplate() {
    const template = document.getElementById('member-template').content;
    return template.cloneNode(true);
}
