# find-extension-and-copy

find the files by extensions and copy

## usage - without defined in json

`feac targetDir={parameter} extensions=[{extension}, {extension2}, {...args}] dist={parameter} replaceFolder={parameter}`

```json
"scripts": {
	"build-readme": "feac targetDir=readme extensions=[.md, .png] dist=readme replaceFolder=true"
}
```

## usage - with defined in json

```json
"scripts": {
	"build-readme": "feac"
}
```

### package.json

```json
	"feac": {
		"targetDir": "src",
		"extensions": [".md", ".png"],
        "dist": "readme",
        "replaceFolder": true
	}
```

### root/feac.json

```json
// project root/feac.json
{
    "targetDir": "src",
    "extensions": [".md", ".png"],
    "dist": "readme",
    "replaceFolder": true
}
```

### configs/feac.json

```json
// project root/configs/feac.json
{
    "targetDir": "src",
    "extensions": [".md", ".png"],
    "dist": "readme",
    "replaceFolder": true
}
```

## example

I need all of src in `.md`, `.png` with folder

input
```
└─src                                   
    │  configs.ts                       
    │  finder.ts                        
    │  index.ts                         
    │  README.md                        
    │                                   
    └─files                              
        │  role.md                      
        │  test.ts        
        │                                   
        └─images                        
            area-spline.pne.png     
            area.png                
            column-chart.png        
            exmaple-bar-chart.png
            README.md
```

### replaceFolder: true

```json
"feac": {
    "targetDir": "src",
    "extensions": [".md", ".png"],
    "dist": "readme",
    "replaceFolder": true
}
```

output
```
─readme
│  README.md
│
└─test
     │ role.md
     │
     └─images
            area-spline.pne.png
            area.png
            column-chart.png
            exmaple-bar-chart.png
            line.png
            pie.png
            scatter.png
            spline.png
            stacked-area-spline.png
            stacked-area.png
            stacked-bar.png
            stacked-column.png
            two-level-pie.png
```

### replaceFolder: false


```json
"feac": {
    "targetDir": "src",
    "extensions": [".md", ".png"],
    "dist": "readme",
    "replaceFolder": false
}
```

output
```json
└─readme
    area-spline.pne.png
    area.png
    column-chart.png
    exmaple-bar-chart.png
    line.png
    pie.png
    README.md
    role.md
    scatter.png
    spline.png
    stacked-area-spline.png
    stacked-area.png
    stacked-bar.png
    stacked-column.png
    two-level-pie.png
```
