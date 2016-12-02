# dropdowngroup
Bootstrap like input group with dropdown menu. Lightweight <br />

License : WTFPL (The Do What The Fuck You Want To Public License)  <br />
Dependant : jQuery, Bootstrap  <br />

Usage: 
```
<div id="#el" class="dropdowngroup">
    <div class="dropdowngroup-content">
        <input class="dropdowngroup-input" name="myInputName" value=""/>
        <select class="dropdowngroup-select" name="mySelectName" data-title="New Title">           
            <option value="1"> Item1 </option>
            <option value="2"> Item2 </option>
            <option value="3"> Item3 </option>
        </select>
    </div>
</div>
```

Using optional title tag sets `data-title` value to be placeholder for select

Methods
```
//Refreshes dropdowngroup
$("#el").dropdowngroup("refresh");

//Empties dropdowngroup value and resets to defaults
$("#el").dropdowngroup("clear");
```

[Preview](https://www.upload.ee/image/6406228/38gs9gifdsfjl43.png)
