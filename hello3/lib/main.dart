import 'dart:io';

import 'package:flutter/material.dart';
import 'package:grpc/grpc.dart';
import 'package:image_picker/image_picker.dart';

import 'generated/infer.pbgrpc.dart' as infer;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '这是啥',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '这是啥？'),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final ImagePicker _picker = ImagePicker();
  final _cli = infer.WebClient(
    ClientChannel(
      '192.168.5.27',
      port: 3001,
      options: const ChannelOptions(credentials: ChannelCredentials.insecure()),
    ),
  );

  var _preds;
  var _image;

  void _pickPhoto(ImageSource source) async {
    XFile? image =
        await _picker.pickImage(source: source, maxHeight: 800, maxWidth: 800);

    if (image == null) {
      return;
    }
    setState(() {
      _image = File(image.path);
    });

    var res = await _cli.process(
      infer.WebRequest(
        image: await image.readAsBytes(),
      ),
    );

    setState(() {
      _preds = res.preds;
    });
  }

  @override
  Widget build(BuildContext context) {
    var preds = _preds;
    var textStyle = Theme.of(context).textTheme.headline6;
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              child: preds != null
                  ? Column(
                      children: [
                        Text(
                          "${preds[0].name}   ${preds[0].probability.toStringAsFixed(3)}",
                          style: textStyle,
                        ),
                        Text(
                          "${preds[1].name}   ${preds[1].probability.toStringAsFixed(3)}",
                          style: textStyle,
                        ),
                        Text(
                          "${preds[2].name}   ${preds[2].probability.toStringAsFixed(3)}",
                          style: textStyle,
                        ),
                      ],
                    )
                  : null,
            ),
            Container(
              child: _image != null
                  ? Image.file(
                      _image,
                      width: 400,
                      height: 400,
                    )
                  : const Text("点击下面按钮试试！"),
            ),
            ButtonBar(
              buttonPadding:
                  const EdgeInsets.symmetric(horizontal: 30, vertical: 10),
              alignment: MainAxisAlignment.center,
              children: [
                TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.all(10.0),
                    primary: Colors.white,
                    backgroundColor: Colors.green,
                    textStyle: const TextStyle(fontSize: 16),
                  ),
                  onPressed: () {
                    _pickPhoto(ImageSource.camera);
                  },
                  child: const Text('拍照'),
                ),
                TextButton(
                  style: TextButton.styleFrom(
                    padding: const EdgeInsets.all(10.0),
                    primary: Colors.white,
                    backgroundColor: Colors.blue,
                    textStyle: const TextStyle(fontSize: 16),
                  ),
                  onPressed: () {
                    _pickPhoto(ImageSource.gallery);
                  },
                  child: const Text('选择图片'),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
