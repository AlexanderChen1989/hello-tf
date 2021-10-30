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
  final _cli = infer.WebClient(
    ClientChannel(
      '192.168.5.27',
      port: 3001,
      options: const ChannelOptions(credentials: ChannelCredentials.insecure()),
    ),
  );

  var _info;
  var _image;

  final ImagePicker _picker = ImagePicker();

  void _incrementCounter() async {
    XFile? image = await _picker.pickImage(
        source: ImageSource.camera, maxHeight: 800, maxWidth: 800);

    if (image == null) {
      return;
    }
    setState(() {
      _image = File(image.path);
    });

    var res = await _cli.process(infer.WebRequest(images: [
      infer.Image(
        filename: image.name,
        body: await image.readAsBytes(),
      )
    ]));

    setState(() {
      _info = res;
    });
  }

  @override
  Widget build(BuildContext context) {
    var preds;
    if (_info != null) {
      preds = _info.results[0].preds;
    }
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
                          style: Theme.of(context).textTheme.headline5,
                        ),
                        Text(
                          "${preds[1].name}   ${preds[1].probability.toStringAsFixed(3)}",
                          style: Theme.of(context).textTheme.headline6,
                        ),
                        Text(
                          "${preds[2].name}   ${preds[2].probability.toStringAsFixed(3)}",
                          style: Theme.of(context).textTheme.headline6,
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
                  : const Text("点击下面按钮，拍只动物试试！"),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.camera_enhance),
      ),
    );
  }
}
