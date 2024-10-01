import { fetchMembers } from './fetchMembers.js';
import { renderMembers } from './renderMembers.js';

// Hent og vis medlemmer ved start
fetchMembers()
    .then(membersData => {
        if (membersData) {
            renderMembers(membersData);
        }
    });
