## Project structure
$ tree . --gitignore -a
.
├── .env
├── .env.development
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   ├── background.jpg
│   │   ├── background_light.png
│   │   ├── background.png
│   │   └── react.svg
│   ├── components
│   │   ├── ChatViewer.jsx
│   │   ├── FileUploader.jsx
│   │   ├── Layout.jsx
│   │   └── UserFiles.jsx
│   ├── hooks
│   │   └── useFetchFiles.js
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── AuthCallback.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   └── styles
│       └── styles.ChatViewer.module.css
├── vite.config.js
├── .vscode
└── WPkeypair.pem               ------------------------- Key for SSH into EC2 instance

    9 directories, 29 files

    src/pages/ → contains route-based components (e.g., Login, Dashboard).
    src/components/ → reusable UI components
    src/hooks/ → custom hook for managing logic in components.
    src/styles/ → centralized styling files, for now for only ChatViewer

## stats
![Stats for lines of code](./.github/cloc.png)

## Build and Copying to EC2 instance
Build using

    npm run build

Copy to EC2 using

    scp -i WPkeypair.pem  -r dist/* <username>@<EC2_url>:<dir_on_ec2>
