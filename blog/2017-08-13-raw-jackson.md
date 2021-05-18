---
title: Handling raw JSON values using Jackson
date:  2017-08-13
---

Suppose that you have an application that gets some JSON value as input data, deserializes it, handles it in some way and then returns some other JSON value as a result. And now, suppose that in the input value there is a part that contains arbitrary JSON sub-object that you don't want to deserialize, but you want to include it in the result object.

If your application uses Jackson to work with JSON, you probably know that Jackson has a special annotation to work with raw values ([@JsonRawValue](https://fasterxml.github.io/jackson-annotations/javadoc/2.5/com/fasterxml/jackson/annotation/JsonRawValue.html)). Unfortunately, this annotation can be used only for serialization of raw values but not for deserialization.

In my last project, I faced with the same problem and in this short note, I would like to share with you the solution I have found.

```java
@JsonSerialize(using = RawObjectSerializer.class)
@JsonDeserialize(using = RawObjectDeserializer.class)
public class RawObject {

    public final String value;

    public RawObject(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
```

```java
import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

public class RawObjectDeserializer extends StdDeserializer<RawObject> {

    public RawObjectDeserializer() {
        super(RawObject.class);
    }

    @Override
    public RawObject deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        return new RawObject(parser.getCodec().readTree(parser).toString());
    }
}
```

```java
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class RawObjectSerializer extends StdSerializer<RawObject> {

    public RawObjectSerializer() {
        super(RawObject.class);
    }

    @Override
    public void serialize(RawObject value, JsonGenerator generator, SerializerProvider provider) throws IOException {
        if (value.getValue() == null) {
            generator.writeNull();
        } else {
            generator.writeRawValue(value.getValue());
        }
    }
}
```

```java
import org.junit.Assert;
import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

public class RawObjectTest {

    private ObjectMapper mapper = new ObjectMapper();

    public static class Message {
        public RawObject data;
        public String field;
    }

    @Test
    public void deserialization() throws Exception {
        String fieldValue = "value";
        String jsonValue = "{\"value\":{\"text\":\"123\"}}";
        String jsonMessage = "{\"data\":" + jsonValue + ",\"field\":\"" + fieldValue + "\"}";

        Message message = mapper.readValue(jsonMessage, Message.class);

        Assert.assertEquals(jsonValue, message.data.getValue());
        Assert.assertEquals(fieldValue, message.field);
    }

    @Test
    public void serialization() throws Exception {
        String fieldValue = "value";
        String jsonValue = "{\"value\":{\"text\":\"123\"}}";
        String jsonMessage = "{\"data\":" + jsonValue + ",\"field\":\"" + fieldValue + "\"}";

        Message message = new Message();
        message.data = new RawObject(jsonValue);
        message.field = fieldValue;

        Assert.assertEquals(jsonMessage, mapper.writeValueAsString(message));
    }
}
```
