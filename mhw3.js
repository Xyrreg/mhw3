function ExtendMenu() {
    let SideNav = document.querySelector('.SideNav');
    let Txt = document.querySelectorAll('.txt');

    if (SideNav.classList.contains('Extended'))
    {
        SideNav.classList.remove('Extended');
        Txt[0].classList.remove('display');
        Txt[1].classList.remove('display');

    }
    else {
        SideNav.classList.add('Extended');
        Txt[0].classList.add('display');
        Txt[1].classList.add('display');

    }
    
}

function SubmitMenuLeft(event) {
    let index;

    //Get Index
    let Submit = document.querySelectorAll('.SubItem');
    for (let i = 0; i < Submit.length; i++) {
        if (Submit[i] == event.currentTarget) {
            index = i;
        }
    }

    let SubmitList = [
        {
            "SubmitImg":"img/Deviation.png",
            "SubmitTitle":"Submit your art",
            "SubmitText":"Upload your creations for people to see, favourite, and share."
        },
        {
            "SubmitImg":"img/Status_Update.png",
            "SubmitTitle":"Post an update",
            "SubmitText":"Tell the community what's on your mind."
        },
        {
            "SubmitImg":"img/Journal.png",
            "SubmitTitle":"Post a journal",
            "SubmitText":"Share your thoughts, experinces, and stories behind the art."
        },
        {
            "SubmitImg":"img/Literature.png",
            "SubmitTitle":"Submit your writing",
            "SubmitText":"Upload stories, poems, charavter descriptions & more."
        },
        {
            "SubmitImg":"img/Commission.png",
            "SubmitTitle":"Sell custom creations",
            "SubmitText":"Offer one-of-a-kind creations to people who love youe style."
        },
        {
            "SubmitImg":"img/Poll.png",
            "SubmitTitle":"Ask the community",
            "SubmitText":"Find out what other devinats think - about anything at all."
        },
        {
            "SubmitImg":"img/Subscription.png",
            "SubmitTitle":"Get your fans'support",
            "SubmitText":"Fund your creativity by creating subscription tiers."
        }
    ]

    let SubmitImg = document.querySelector("#SubmitImg");
    let SubmitTitle = document.querySelector("#SubmitTitle");
    let SubmitText = document.querySelector("#SubmitText");

    SubmitImg.src = SubmitList[index].SubmitImg;
    SubmitTitle.textContent = SubmitList[index].SubmitTitle;
    SubmitText.textContent = SubmitList[index].SubmitText;
}



function CreateImg(Icon, User, Title, Img) {
    let icon = document.createElement("img");
    icon.classList.add("Icon");
    icon.src = Icon;

    let userDiv = document.createElement("div");
    userDiv.classList.add("User");
    userDiv.appendChild(icon);
    userDiv.append(User);
    
    let info = document.createElement("div");
    info.classList.add("Info");

    let title = document.createElement("div");
    title.classList.add("Title");
    title.textContent = Title;

    info.appendChild(title);
    info.appendChild(userDiv);

    let element = document.createElement("a");
    element.classList.add("Element");

    let img = document.createElement("img");
    img.classList.add("Img");
    img.src = Img;

    element.appendChild(img);
    element.appendChild(info);

    return element;
}

let Menu_Icon = document.querySelector('#Menu_Icon');
Menu_Icon.addEventListener('click', ExtendMenu);

let Submit = document.querySelectorAll('.SubItem');
for (let i = 0; i < Submit.length; i++) {
    Submit[i].addEventListener('mouseover', SubmitMenuLeft);
}

let ElemList = [
    {
        "Icon":"Example_img/EDESI.jpg",
        "User":"EDESI",
        "Title":"Warlock Silhouette",
        "Img":"Example_img/Warlock_Silhouette_by_EDESI.jpg"
    },
    {
        "Icon":"Example_img/NUMENRMX.jpg",
        "User":"NUMENRMX",
        "Title":"Dragoon - numenrmx",
        "Img":"Example_img/Dragoon_-_numenrmx_by_NUMENRMX.jpg"
    },
    {
        "Icon":"Example_img/Wicke2d.png",
        "User":"Wicke2d",
        "Title":"untitled",
        "Img":"Example_img/untitled_by_Wicke2d.jpg"
    }
];

let section = document.querySelector("section");
for(let i = 0; i < ElemList.length; i++) {
    let elem = CreateImg(ElemList[i].Icon,ElemList[i].User, ElemList[i].Title, ElemList[i].Img);
    section.append(elem);
}

// API: Art Institute of Chicago => https://api.artic.edu/docs/
// Simulating the DeviantArt account of the Art Institute of Chicago

const subject = ["cats", "dogs", "warriors", "dragons", "knigths"];

function AddImg(json) {

    if(json.data.image_id != null) {
        let elem = CreateImg(
        "Example_img/Art_Institute_of_Chicago.png",
        "Art Institute of Chicago",
        json.data.title,
        json.config.iiif_url + "/" + json.data.image_id + "/full/300,/0/default.jpg");

        section.append(elem);
    }  
}

function GetImg(json) {
    //The first fetch return general info from the query
    //Another fetch is need to access the img

    for(let i = 0; i < 4; i++) {
        const url = "https://api.artic.edu/api/v1/artworks/" + json.data[i].id + "?fields=id,title,image_id";
        fetch(url).then(onResponse).then(AddImg);
    }

}

function onResponse(response) {
    return response.json();
}

fetch("https://api.artic.edu/api/v1/artworks/search?q=" + subject[Math.floor(Math.random() * subject.length)])
    .then(onResponse).then(GetImg);


// API: unsplash => https://unsplash.com/documentation
// Simulating the DeviantArt account of random users

function onJson(json) {

    let elem = CreateImg(
        json.user.profile_image.medium,
        json.user.name,
        json.alt_description,
        json.links.download);

    section.append(elem);
}

const Access_Key = "";


for(let i = 0; i < 6; i++)
    fetch("https://api.unsplash.com/photos/random/?client_id=" + Access_Key)
        .then(onResponse).then(onJson);