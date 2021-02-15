import { Amplify } from "@aws-amplify/core";
import API from "@aws-amplify/api-rest";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

import JQuery from 'jquery'

export interface SubscriberObject {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
}

const API_NAME = awsconfig.aws_cloud_logic_custom[0].name;
declare global {
    interface Window { JQuery: typeof JQuery; }
}
// window.JQuery = window.$ = JQuery;
window.JQuery = JQuery;

let submitting = false;
function onSubmitForm() {
    if (submitting)
    submitting = true;
    const newSubscriber = {
        email     : JQuery('#create [name=email]').val(),
        firstName : JQuery('#create [name=firstName]').val(),
        lastName  : JQuery('#create [name=lastName]').val()
    };

    console.log(newSubscriber);
    clearForm();
    createSubscriber(newSubscriber).then(({ data } : { data: SubscriberObject }) => {
        submitting = false;
        console.log('okey');
        console.log(data);
        showSubscriber(data);
        clearForm();
        hideError();
    }).catch((error : Error & { toJSON(): void } & {
        response? : {
            data?: {
                status : number | boolean,
                error  : { message : string }
            }
        }
    }) => {
        submitting = false;
        console.log(error);
        showError(error?.response?.data?.error?.message ||  error.message);
    })
    return false;
}
function clearForm() {
    JQuery('#create [name=email]').val('');
    JQuery('#create [name=firstName]').val('');
    JQuery('#create [name=lastName]').val('');
}
// function loadSubscribers() {

// }
async function createSubscriber(subscriber : Record<string, unknown>) {
    return API.post(API_NAME, '/subscribers', {
        body: subscriber, // replace this with attributes you need
        headers: {}, // OPTIONAL
    });
}
async function listSubscribers() {
    return API.get(API_NAME, '/subscribers', {});
}
JQuery('#create').on('submit', onSubmitForm)


function resreshSubscribers() {
    listSubscribers().then(( { data } : { data: SubscriberObject[] } ) => {
        console.log(data);
        for(const subscriber of data) showSubscriber(subscriber);
    }).catch((error : Error) => {
        console.log(error);
        showError(error.message);
    });
}

function showSubscriber(subscriber : SubscriberObject) {
    console.log(subscriber);
    console.log();
    JQuery('#subscribers').prepend(`<div class="alert alert-light">${subscriber.firstName} ${subscriber.lastName} (${subscriber.email}) added at ${new Date(subscriber.createdAt).toLocaleString()}</div>`)
}
function showError(message : string) {
    JQuery('#alerts').text(message);
    JQuery('#alerts').css('visibility', 'visible');
}
function hideError() {
    JQuery('#alerts').text('');
    JQuery('#alerts').css('visibility', 'hidden');
}

resreshSubscribers();